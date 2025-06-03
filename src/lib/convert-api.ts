// Safely check environment variable without throwing
export const getConvertApiSecret = () => {
  const secret = process.env.CONVERT_API_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    console.error('CONVERT_API_SECRET environment variable is not configured');
    return null;
  }
  return secret;
};

const API_BASE = 'https://v2.convertapi.com'
const API_SECRET = getConvertApiSecret()

interface ConversionOptions {
  format?: string
  quality?: 'low' | 'medium' | 'high'
  preserveFormatting?: boolean
}

async function makeRequest(endpoint: string, data: FormData): Promise<Response> {
  if (!API_SECRET) {
    throw new Error('Conversion service is not properly configured')
  }

  const url = `${API_BASE}${endpoint}?secret=${API_SECRET}`
  return fetch(url, {
    method: 'POST',
    body: data,
  })
}

async function downloadFile(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to download converted file')
  }
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function convertFile(
  file: File | Buffer,
  fromFormat: string,
  toFormat: string,
  options: ConversionOptions = {}
): Promise<{ url: string, filename: string }> {
  try {
    // Check API secret first
    if (!API_SECRET) {
      throw new Error('Conversion service is not properly configured')
    }

    // Prepare form data
    const formData = new FormData()

    // Add file
    if (file instanceof File) {
      formData.append('file', file)
    } else {
      formData.append('file', new Blob([file]), `file.${fromFormat}`)
    }

    // Add conversion parameters
    formData.append('StoreFile', 'true')
    formData.append('ImageQuality', 
      options.quality === 'low' ? 'low' : 
      options.quality === 'medium' ? 'medium' : 'high'
    )
    
    if (options.preserveFormatting !== undefined) {
      formData.append('PreserveFormatting', options.preserveFormatting.toString())
    }

    // Make conversion request
    const response = await makeRequest(`/convert/${fromFormat}/to/${toFormat}`, formData)
    
    if (!response.ok) {
      let errorMessage = 'Conversion failed'
      try {
        const errorData = await response.json()
        errorMessage = errorData.Error || errorData.Message || errorMessage
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`
      }
      throw new Error(errorMessage)
    }

    // Parse response
    const result = await response.json()
    
    const fileResult = result?.Files?.[0]
    if (!fileResult?.Url) {
      throw new Error('No converted file URL received')
    }

    return {
      url: fileResult.Url,
      filename: fileResult.FileName || `converted.${toFormat}`
    }

  } catch (error) {
    console.error('ConvertAPI Error:', error)
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to convert file'
    )
  }
}

export async function convertPDFToWord(file: File | Buffer, options?: ConversionOptions): Promise<{ url: string, filename: string }> {
  return convertFile(file, 'pdf', 'docx', {
    ...options,
    preserveFormatting: true,
    quality: 'high'
  })
}

export async function convertWordToPDF(file: File | Buffer, options?: ConversionOptions): Promise<{ url: string, filename: string }> {
  return convertFile(file, 'docx', 'pdf', {
    ...options,
    quality: 'high'
  })
}

export async function convertExcelToPDF(file: File | Buffer, options?: ConversionOptions): Promise<{ url: string, filename: string }> {
  return convertFile(file, 'xlsx', 'pdf', {
    ...options,
    quality: 'high'
  })
}

export async function convertWebPToJPG(file: File | Buffer, options?: ConversionOptions): Promise<{ url: string, filename: string }> {
  return convertFile(file, 'webp', 'jpg', {
    ...options,
    quality: options?.quality || 'high'
  })
}

// Export types for use in other files
export type { ConversionOptions }