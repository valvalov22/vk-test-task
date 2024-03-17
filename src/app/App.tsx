import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CellButton, Group, Panel, View } from "@vkontakte/vkui";
import { CatFact } from "../features/catFact";
import { AgifyForm } from "../features/agify";
import "@vkontakte/vkui/dist/vkui.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [activePanel, setActivePanel] = useState("main");

    return (
        <QueryClientProvider client={queryClient}>
            <View nav="main" activePanel={activePanel}>
                <Panel id="main">
                    <Group>
                        <CatFact />
                        <CellButton onClick={() => setActivePanel("second")}>
                            Перейти, чтобы узнать свой возраст
                        </CellButton>
                    </Group>
                </Panel>

                <Panel id="second">
                    <Group>
                        <AgifyForm />
                        <CellButton onClick={() => setActivePanel("main")}>
                            Перейти, чтобы получить рандомный факт
                        </CellButton>
                    </Group>
                </Panel>
            </View>
        </QueryClientProvider>
    );
};

export default App;
