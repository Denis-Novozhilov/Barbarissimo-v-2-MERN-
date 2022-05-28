import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from "./pages/AuthPage";
import { Lobby } from "./pages/Lobby";
import { CreatePhrase } from "./pages/CreatePhrase";
import { PhraseDetailPage } from "./pages/PhraseDetailPage";
import { PhrasesListPage } from "./pages/PhrasesListPage";
import { SignUpPage } from "./pages/SignUpPage";

export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <Switch>

                <Route path="/phrases-list" exact>
                    <PhrasesListPage />
                </Route>

                <Route path="/create-phrase" exact>
                    <CreatePhrase />
                </Route>

                <Route path="/lobby" exact>
                    <Lobby />
                </Route>



                <Route path="/phrases-detail/:id">
                    <PhraseDetailPage />
                </Route>

                <Redirect to="/lobby" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
            <Redirect to="/" />
        </Switch>
    );
}