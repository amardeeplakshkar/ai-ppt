import pptxgen from 'pptxgenjs';
import { PresentationData, SlideContent, TitleDescription } from './types';

export async function generatePPTX(data: PresentationData): Promise<Blob> {
  const pptx = new pptxgen();
  
  // Set presentation properties
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI PowerPoint Generator';
  pptx.title = data.presentation.title;
  
  // Create title slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "#FFFFFF" };
  
  titleSlide.addText(data.presentation.title, {
    x: 0,
    y: "40%",
    w: "100%",
    h: 1,
    fontSize: 36,
    bold: true,
    color: "003366",
    align: "center",
    fontFace: "Arial",
  });
  
  // Process each slide
  data.presentation.slides.forEach((slide) => {
    const newSlide = pptx.addSlide();
    
    // Add slide title
    newSlide.addText(slide.slide_title, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      h: 1,
      fontSize: 28,
      bold: true,
      color: "003366",
      align: "center",
      fontFace: "Arial",
    });
    
    // Process each content section
    slide.content.forEach((section, sectionIndex) => {
      // Add section title if it exists
      if (section.title) {
        newSlide.addText(section.title, {
          x: 0.5,
          y: 1.5 + (sectionIndex * 0.5),
          w: "90%",
          h: 0.5,
          fontSize: 20,
          bold: true,
          color: "333333",
          align: "left",
          fontFace: "Arial",
        });
      }
      
      // Process subsections
      section.subsections.forEach((subsection, subIndex) => {
        const yPos = 2 + (sectionIndex * 0.5) + (subIndex * 1.5);
        
        // Add subsection title
        if (subsection.title) {
          newSlide.addText(subsection.title, {
            x: 0.5,
            y: yPos,
            w: "90%",
            h: 0.5,
            fontSize: 16,
            bold: true,
            color: "666666",
            align: "left",
            fontFace: "Arial",
          });
        }
        
        // Add subsection content
        if (subsection.content) {
          newSlide.addText(subsection.content, {
            x: 0.5,
            y: yPos + 0.5,
            w: "45%",
            h: 1,
            fontSize: 14,
            color: "333333",
            align: "left",
            fontFace: "Arial",
          });
        }
        
        // Add image if available
        if (subsection.image_src) {
          try {
            newSlide.addImage({
              path: subsection.image_src,
              x: 6,
              y: yPos,
              w: 3.5,
              h: 2.5,
            });
          } catch (error) {
            console.error("Failed to add image:", error);
          }
        }
      });
    });
  });
  
  // Generate the PPTX as a blob
  return await pptx.writeFile({ outputType: 'blob' });
}

// Legacy function for compatibility
export async function CreatePowerpointFromArrayOfObjects(
  titleAndDescription: TitleDescription,
  slides: SlideContent[],
  userId: string
): Promise<{ blob: Blob, fileName: string }> {
  const pptx = new pptxgen();

  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "#FFFFFF" };

  titleSlide.addText(titleAndDescription.title, {
    x: 0,
    y: "40%",
    w: "100%",
    h: 1,
    fontSize: 33,
    bold: true,
    color: "003366",
    align: "center",
    fontFace: "Helvetica",
  });

  titleSlide.addText(titleAndDescription.description, {
    x: 0,
    y: "58%",
    w: "100%",
    h: 0.75,
    fontSize: 18,
    color: "888888",
    align: "center",
    fontFace: "Helvetica",
  });

  slides.forEach(({ title, content }) => {
    const slide = pptx.addSlide();
    slide.addText(title, {
      x: 0.5,
      y: 0.5,
      w: 8.5,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "003366",
      align: "center",
      fontFace: "Arial",
    });

    content.forEach((bullet, index) => {
      slide.addText(bullet, {
        x: 1,
        y: 1.8 + index * 1,
        w: 8,
        h: 0.75,
        fontSize: 15,
        color: "333333",
        align: "left",
        fontFace: "Arial",
        bullet: true,
      });
    });
  });

  try {
    const fileName = `presentation-${Date.now()}-${userId}.pptx`;
    const blob = await pptx.writeFile({ outputType: 'blob' });
    
    return {
      blob,
      fileName
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create powerpoint");
  }
}