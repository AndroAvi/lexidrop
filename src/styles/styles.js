// Reusable Tailwind CSS classes for the LexiDrop application

// Color palette
export const colors = {
  primary: 'bg-[#DB5375]',
  primaryHover: 'hover:bg-[#DB5375]/80',
  primaryText: 'text-[#DB5375]',
  secondary: 'bg-[#E34234]',
  secondaryHover: 'hover:bg-[#E34234]/80',
  secondaryText: 'text-[#E34234]',
  light: 'bg-[#F4C7C7]',
  lightHover: 'hover:bg-[#F4C7C7]/80',
  lightText: 'text-[#F4C7C7]',
  lightTextHover: 'hover:text-[#F4C7C7]',
  lightTextMuted: 'text-[#F4C7C7]/70',
};

// Layout classes
export const layout = {
  fullScreen: 'min-h-screen w-screen overflow-auto',
  container: 'min-h-screen w-full flex flex-col items-center justify-center py-8',
  centered: 'flex items-center justify-center',
  card: 'bg-[#F4C7C7] rounded-xl p-8 shadow-lg',
  section: 'w-full max-w-xl',
};

// Typography classes
export const typography = {
  heading: 'text-3xl font-bold text-[#F4C7C7] text-center mb-4',
  subheading: 'text-xl font-bold text-[#E34234] mb-6 text-center',
  paragraph: 'text-center text-[#F4C7C7] text-lg mb-8',
  sectionLabel: 'text-sm font-medium text-[#E34234]/80 mb-2 text-left',
  smallText: 'text-[#F4C7C7] text-sm',
};

// Button classes
export const buttons = {
  primary: 'bg-[#E34234] text-[#F4C7C7] font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-lg flex items-center justify-center',
  primaryHover: 'hover:bg-[#E34234]/80',
  navButton: 'px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200',
  navButtonActive: 'text-[#F4C7C7] border-[#F4C7C7]',
  navButtonInactive: 'text-[#F4C7C7]/70 border-transparent',
};

// Grid layouts
export const grids = {
  twoColumns: 'grid grid-cols-2 gap-4 w-full',
  fiveColumns: 'grid grid-cols-5 gap-4',
};

// Interactive elements
export const interactive = {
  transition: 'transition-all duration-300',
  hover: 'hover:scale-105 hover:shadow-md',
  active: 'active:scale-95',
};

// Progress bar
export const progress = {
  container: 'w-full mx-auto bg-[#F4C7C7] rounded-full h-4 overflow-hidden',
  bar: 'h-full transition-all duration-500 ease-out rounded-full bg-[#E34234]',
  complete: 'bg-[#E34234] animate-[pulse_2s_ease-in-out_infinite]',
};

// Separator
export const separator = {
  default: 'border-b-2 border-[#E34234]/20 my-6'
};

// Combine multiple classes
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
