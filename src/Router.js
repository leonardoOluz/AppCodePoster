import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Comunidade from 'pages/Comunidade';
import PaginaNaoEncontrada from 'pages/PaginaNaoEncontrada';
import FormularioEdicao from 'pages/FormularioEdicao';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import PaginaBase from 'components/PaginaBase';
import MeuPoster from 'pages/MeuPosters';
import Poster from 'pages/Poster';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />} >
          <Route index element={<Comunidade />} />
          <Route path='editor' element={<FormularioEdicao />} />
          <Route path='editar/:id' element={<FormularioEdicao />} />
          <Route path='meu-posters' element={<MeuPoster />} />
          <Route path='poster/:id' element={<Poster/>}/>
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='*' element={<PaginaNaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
