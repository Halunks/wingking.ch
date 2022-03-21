import React, {ReactNode} from "react";
import Header from "./Header";

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div>
        <Header/>
        <div className="layout">{props.children}</div>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

          html {
            box-sizing: border-box;
          }

          .title {
            font-family: 'Fredoka One', sans-serif;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
            background: rgba(0, 0, 0, 0.05);
          }

          input,
          textarea {
            font-size: 16px;
          }

          button {
            cursor: pointer;
            border-radius: 2px;
          }
        `}</style>
        <style jsx>{`
          .layout {
            padding: 0 1rem;
          }
        `}</style>
    </div>
);

export default Layout;
