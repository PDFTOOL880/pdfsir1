import { NextResponse } from 'next/server'
import { convertPDFToWord } from '@/lib/convert-api'

export const maxDuration = 300 // 5 minutes timeout

function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    { 
      error: message,
      timestamp: new Date().toISOString()
    },
    { 
      status,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const settingsStr = formData.get('settings')

    // Basic validation
    if (!file || !(file instanceof File)) {
      return errorResponse('No file provided or invalid file')
    }

    if (!settingsStr) {
      return errorResponse('No settings provided')
    }

    // Parse settings
    let settings
    try {
      settings = JSON.parse(settingsStr as string)
    } catch {
      return errorResponse('Invalid settings format')
    }

    // File validation
    if (!file.type.includes('pdf')) {
      return errorResponse('Invalid file type. Please provide a PDF file.')
    }

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_SIZE) {
      return errorResponse('File size exceeds 10MB limit.')
    }

    try {
      // Process the conversion
      const convertedBuffer = await convertPDFToWord(file, {
        format: settings.format || 'docx',
        quality: settings.quality || 'high',
        preserveFormatting: settings.preserveFormatting ?? true
      })

      // Prepare filename
      const originalName = file.name.replace(/\.pdf$/i, '')
      const extension = settings.format || 'docx'
      const newFilename = `${originalName}.${extension}`

      // Return converted file
      return new NextResponse(convertedBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(newFilename)}`,
          'Content-Length': convertedBuffer.length.toString(),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })

    } catch (conversionError) {
      console.error('Conversion error:', conversionError)
      return errorResponse(
        conversionError instanceof Error 
          ? conversionError.message 
          : 'Failed to convert file',
        500
      )
    }

  } catch (error) {
    console.error('API error:', error)
    return errorResponse(
      'An unexpected error occurred while processing your request',
      500
    )
  }
}

// Configure API route
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '20mb',
  },
}