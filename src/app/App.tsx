import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Panel, View } from "@vkontakte/vkui";
import { CatFact } from "../features/catFact";
import { AgifyForm } from "../features/agify";
import "@vkontakte/vkui/dist/vkui.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <View nav="main" activePanel="main">
                <Panel id="main">
                    <CatFact />
                </Panel>
            </View>
            <View nav="second" activePanel="second">
                <Panel id="second">
                    <AgifyForm />
                </Panel>
            </View>
        </QueryClientProvider>
    );
};

export default App;
