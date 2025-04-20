interface Step {
  title: string;
  content: string;
  icon: string;
}

interface BlogPost {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
  content: string;
  steps: Step[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "PDF to Word Conversion",
    description: "How to Accurately Convert PDF Files to Editable Word Documents",
    image: "/blog/images/pdf-to-word.jpg", // Using existing image as placeholder
    date: "2025-04-07",
    readTime: "4 min read",
    slug: "pdf-to-word",
    content: "Converting PDF files to Word documents is a common task, especially when you need to edit or update the content inside a PDF. In this guide, we'll walk you through the process of converting PDF files to Word while preserving the formatting, layout, and quality.",
    steps: [
      {
        title: "Using Online Tools",
        content: "Upload your PDF file to online converters like PDFsir, click 'Convert to Word', and download the resulting .docx file. Fast and simple method, but requires internet access.",
        icon: "🌐"
      },
      {
        title: "Microsoft Word Method",
        content: "Open Word, drag the PDF file into it, and let Word convert it automatically. Works best for simple documents and requires Microsoft Word installation.",
        icon: "📝"
      },
      {
        title: "Adobe Acrobat Pro",
        content: "Use Adobe Acrobat Pro for high-accuracy conversion. Go to File > Export To > Microsoft Word, choose format and export. Best for complex layouts.",
        icon: "📄"
      },
      {
        title: "Preserve Formatting",
        content: "Avoid scanned PDFs, use tools that support font embedding, and check headings, lists, and tables after conversion to ensure proper formatting.",
        icon: "✨"
      }
    ]
  },
  {
    title: "PDF Compression Guide",
    description: "Learn how to effectively compress PDF files while maintaining quality",
    image: "/blog/images/pdf-compression.jpg",
    date: "2025-04-10",
    readTime: "5 min read",
    slug: "pdf-compression",
    content: "Understanding PDF compression is crucial for managing document size without sacrificing quality. This comprehensive guide will walk you through the best practices and techniques for optimal PDF compression.",
    steps: [
      {
        title: "Analyze Your PDF",
        content: "Before compression, analyze your PDF content. Different types of content (text, images, graphics) require different compression strategies.",
        icon: "🔍"
      },
      {
        title: "Choose Compression Level",
        content: "Select the appropriate compression level based on your needs. High compression for storage, medium for general use, and low for maintaining maximum quality.",
        icon: "⚖️"
      },
      {
        title: "Optimize Images",
        content: "Images often take up the most space. Optimize them by reducing resolution for web viewing while keeping them clear and readable.",
        icon: "🖼️"
      },
      {
        title: "Review and Adjust",
        content: "After compression, review the document to ensure quality meets your requirements. Make adjustments if needed.",
        icon: "✅"
      }
    ]
  },
  {
    title: "Image Optimization Best Practices",
    description: "Best practices for optimizing images for web performance",
    image: "/blog/images/image-optimization.jpg",
    date: "2025-04-09",
    readTime: "4 min read",
    slug: "image-optimization",
    content: "Image optimization is essential for creating fast-loading websites and applications. Learn the latest techniques and tools to optimize your images effectively.",
    steps: [
      {
        title: "Choose Right Format",
        content: "Select the appropriate image format (JPEG, PNG, WebP) based on image type and use case. WebP offers excellent compression for modern browsers.",
        icon: "📁"
      },
      {
        title: "Resize Appropriately",
        content: "Resize images to the maximum size needed for display. Serving oversized images wastes bandwidth and slows loading times.",
        icon: "📏"
      },
      {
        title: "Compress Smartly",
        content: "Use modern compression tools that maintain visual quality while reducing file size. Consider using lossy compression for photos and lossless for graphics.",
        icon: "🗜️"
      },
      {
        title: "Implement Lazy Loading",
        content: "Use lazy loading to defer loading of off-screen images, improving initial page load performance.",
        icon: "⚡"
      }
    ]
  },
  {
    title: "Security in File Processing",
    description: "Understanding security measures in file processing systems",
    image: "/blog/images/security.jpg",
    date: "2025-04-08",
    readTime: "6 min read",
    slug: "security",
    content: "Security is paramount when handling file processing. Learn about essential security measures and best practices to protect your system and user data.",
    steps: [
      {
        title: "Validate File Types",
        content: "Always validate file types and extensions before processing. Only accept allowed file types to prevent security vulnerabilities.",
        icon: "🛡️"
      },
      {
        title: "Implement Virus Scanning",
        content: "Scan uploaded files for malware and viruses using reliable antivirus solutions integrated into your processing pipeline.",
        icon: "🔬"
      },
      {
        title: "Secure Storage",
        content: "Use secure storage solutions with encryption at rest and proper access controls to protect processed files.",
        icon: "🔒"
      },
      {
        title: "Monitor and Log",
        content: "Implement comprehensive logging and monitoring systems to track file processing activities and detect potential security issues.",
        icon: "📊"
      }
    ]
  }
];