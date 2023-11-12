import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NewEvento from "./components/pages/NewEvento";
import Eventos from "./components/pages/Eventos";
import Evento from "./components/pages/Evento";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Inicio from "./components/pages/Inicio";
import NewSolicitacao from "./components/pages/NewSolicitacao";
import Solicitacao from "./components/pages/Solicitacao";
import Solicitacoes from "./components/pages/Solicitacoes";
import BuscarLixeiras from "./components/pages/BuscaLixeiras";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Container customClass="min-height">
          
          <Route exact path="/">
            <Inicio />
          </Route>

          <Route path="/solicitacoes">
            <Solicitacoes />
          </Route>

          <Route path="/eventos">
            <Eventos />
          </Route>

          <Route path="/newevento">
            <NewEvento />
          </Route>

          <Route path="/newsolicitacao">
            <NewSolicitacao />
          </Route>

          <Route path="/solicitacao/:id">
            <Solicitacao />
          </Route>

          <Route path="/evento/:id">
            <Evento />
          </Route>

          <Route path="/buscarlixeiras">
            <BuscarLixeiras />
          </Route>
        </Container>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
