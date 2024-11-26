export const SuccessSvg = ({ color = "white" }: any) => {
  return (
    <svg
      width='160'
      height='160'
      viewBox='0 0 160 160'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M80 0C35.6667 0 0 35.6667 0 80C0 124.333 35.6667 160 80 160C124.333 160 160 124.333 160 80C160 35.6667 124.333 0 80 0ZM124.667 60L73.6667 111.667C71.6667 113.667 68.3333 113.667 66.3333 111.667L38.3333 83.3333C36.3333 81.3333 36.3333 78 38.3333 76L45.6667 68.6667C47.6667 66.6667 51 66.6667 53 68.6667L67.6667 83.6667C69 85 71.3333 85 72.6667 83.6667L110 45C112 43 115.333 43 117.333 45L124.667 52.3333C127 54.3333 127 57.6667 124.667 60Z'
        fill={color}
      />
    </svg>
  );
};