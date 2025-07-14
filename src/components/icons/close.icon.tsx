import { FC, SVGProps } from "react";

interface CloseIconProps extends SVGProps< SVGSVGElement > {};

const CloseIcon: FC<CloseIconProps> = () => {

  return (

    <svg 
    
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    
    >
      
      <g clipPath="url(#clip0_3025_68419)">
        
        <path d="M1.65109 0L6.24957e-07 1.65109L8.34886 9.99995L0 18.3488L1.65109 19.9999L9.99995 11.651L18.3488 19.9999L19.9999 18.3488L11.651 9.99995L19.9999 1.65109L18.3488 0L9.99995 8.34886L1.65109 0Z" fill="#D4DCEA"/>
      
      </g>
      
      <defs>
        
        <clipPath id="clip0_3025_68419">
          
          <rect width="20" height="20" fill="white"/>
        
        </clipPath>
      
      </defs>
    
    </svg>

  );

};

export default CloseIcon;