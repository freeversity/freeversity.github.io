import { FC } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Summary } from "../pages/Summary/Summary";
import { ChapterRouter } from "./ChapterRouter";

export interface AppRouterProps {
    className?: string;
}

const AppRouter: FC<AppRouterProps> = ({className}) => (
    <BrowserRouter>
    <Routes>
      <Route path='/chapters/:chapterId/*' element={<ChapterRouter className={className}/>} />
      <Route path='/' element={<Summary className={className}/>} />
      {/* <Route path='/' element={<Summary />} /> */}
    </Routes>
  </BrowserRouter>
);

export {AppRouter}