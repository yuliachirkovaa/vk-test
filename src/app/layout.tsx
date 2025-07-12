import Header from "@/components/header";
import { ReactNode } from "react";

const RootLayout = ({ children }: Readonly< { children: ReactNode } > ) => {
  
  return (

    <html lang = "ru">

      <head>

        <title>Фильмы на каждый день</title>
        
      </head>

      <body>

        <Header/>

        { children }
          
      </body> 
      
    </html>

  );
  
};

export default RootLayout;


