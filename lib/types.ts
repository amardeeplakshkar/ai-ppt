export interface TitleDescription {
    title: string;
    description: string;
  }
  
  export interface SlideContent {
    title: string;
    content: string[];
  }
  
  export interface Subsection {
    title: string;
    content: string;
    image_src?: string;
  }
  
  export interface Section {
    title: string;
    subsections: Subsection[];
  }
  
  export interface Slide {
    slide_title: string;
    content: Section[];
  }
  
  export interface Presentation {
    title: string;
    slides: Slide[];
  }
  
  export interface PresentationData {
    presentation: Presentation;
  }