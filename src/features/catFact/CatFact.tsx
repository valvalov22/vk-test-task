import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCatFact } from "./api";
import "@vkontakte/vkui/dist/vkui.css";

export const CatFact: React.FC = () => {
    const {
        data: catFact,
        error: catFactError,
        isLoading: catFactIsLoading,
        refetch: refetchCatFact,
    } = useQuery({
        queryKey: ["catFact"],
        queryFn: getCatFact,
    });

    const catFactInputRef = useRef<HTMLInputElement>(null);

    const handleCatFactClick = async () => {
        const { data: newCatFact } = await refetchCatFact();

        if (newCatFact) {
            const fact = newCatFact.fact;
            if (catFactInputRef.current) {
                const spaceIndex = fact.indexOf(" ");
                catFactInputRef.current?.focus();
                if (spaceIndex !== -1) {
                    setTimeout(() => {
                        catFactInputRef.current?.setSelectionRange(
                            spaceIndex + 1,
                            spaceIndex + 1
                        );
                    }, 0);
                }
            }
        }
    };

    return (
        <div>
            {catFactIsLoading && <p>Загрузка...</p>}
            {catFactError && <p>Ошибка: {catFactError.message}</p>}
            {catFact && <input ref={catFactInputRef} value={catFact.fact} />}
            <button onClick={handleCatFactClick}>
                Получить новый факт о коте
            </button>
        </div>
    );
};
