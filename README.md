# 🎯 AI PowerPoint Generator

<div align="center">
  <img src="https://image.pollinations.ai/prompt/A%20modern%20presentation%20slide%20with%20AI%20generating%20content%2C%20minimalist%20design" width="500" alt="AI PowerPoint Generator" />
  
  <p><em>Transform your ideas into professional presentations with AI</em></p>
</div>

## ✨ Overview

AI PowerPoint Generator is a modern web application that leverages artificial intelligence to automatically create structured, professional PowerPoint presentations from simple topic inputs. This tool streamlines the presentation creation process, saving hours of work while ensuring high-quality, well-organized content.

## 🚀 Features

- **AI-Powered Content Generation**: Enter any topic and get a complete presentation structure
- **Hierarchical Outline Creation**: Automatically generates logical sections and subsections
- **Interactive Preview**: Review and edit the generated outline before finalizing
- **PowerPoint Export**: Download presentations in PPTX format compatible with Microsoft PowerPoint
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred visual theme

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion
- **AI Integration**: Pollinations.ai API
- **PowerPoint Generation**: pptxgenjs

## 🏗️ Architecture

The application follows a modern architecture with:

1. **Client-Side Rendering**: For interactive UI components
2. **API Integration**: Connects to Pollinations.ai for AI text generation
3. **Component-Based Structure**: Modular design for maintainability
4. **Context API**: For state management across components

## 📋 Workflow

1. **Topic Input**: User enters a presentation topic
2. **Outline Generation**: AI creates a structured outline with sections and subsections
3. **Outline Review/Edit**: User can review and modify the generated outline
4. **Presentation Generation**: AI transforms the outline into a complete presentation
5. **Preview & Download**: User previews the presentation and downloads as PPTX

## 🖥️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-ppt-generator.git

# Navigate to the project directory
cd ai-ppt-generator

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
ai-ppt-generator/
├── app/                    # Next.js app directory
│   ├── (routes)/           # Application routes
│   │   ├── content/        # Content display page
│   │   ├── generator/      # PowerPoint generation page
│   │   ├── outline/        # Outline creation page
│   │   └── test/           # Testing page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── providers/          # Provider components
│   ├── ui/                 # UI component library
│   └── ...                 # Other components
├── constant/               # Application constants
├── lib/                    # Utility functions and types
│   ├── pptx.ts             # PowerPoint generation logic
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Helper utilities
├── public/                 # Static assets
└── ...                     # Configuration files
```

## 🔧 Key Components

### Input Component

The AI input component provides an intuitive interface for users to enter their presentation topics, with animated placeholder suggestions to guide users.

### Outline Renderer

Displays the AI-generated outline with proper formatting and hierarchy, allowing users to visualize the structure of their presentation.

### PowerPoint Generator

Transforms the structured outline into a complete PowerPoint presentation with slides, sections, and content.

### Download Button

Handles the generation and download of the PowerPoint file, with loading states to provide feedback during processing.

## 🎨 Customization

### Themes

The application supports both light and dark modes. Users can toggle between themes using the theme switcher in the navigation bar.

### Presentation Styles

The generated PowerPoint presentations follow a professional design template with consistent styling, colors, and typography.

## 🔍 Future Enhancements

- **User Accounts**: Save and manage multiple presentations
- **Template Selection**: Choose from various presentation templates
- **Collaboration**: Share and collaborate on presentations
- **Advanced Customization**: More control over design elements
- **Export Options**: Additional export formats (PDF, Google Slides)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Pollinations.ai](https://pollinations.ai/) - AI text generation
- [pptxgenjs](https://github.com/gitbrent/PptxGenJS) - PowerPoint generation library