import Header from "@/components/header";
import { ReactNode } from "react";
import "@/styles/globals.scss";

const RootLayout = ({ children }: Readonly< { children: ReactNode } > ) => {
  
  return (

    <html lang = "ru">

      <head>

        <title>Фильмы на каждый день</title>
        <meta name = "viewport" content = "width=device-width, initial-scale=1" />

      </head>

      <body>

        <Header/>
        { children }
        
      </body>       
      
    </html>

  );
  
};

export default RootLayout;


