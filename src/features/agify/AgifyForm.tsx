import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAgifyAge } from "./api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "@vkontakte/vkui/dist/vkui.css";

export const AgifyForm: React.FC = () => {
    const [age, setAge] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);
    const schema = yup.object().shape({
        name: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Поле должно содержать только буквы")
            .required("Поле обязательно для заполнения"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const agifyMutation = useMutation({
        mutationFn: getAgifyAge,
        onSuccess: (data) => {
            setAge(data.age);
        },
        onError: (error) => {
            console.error("Agify error:", error);
        },
    });

    const handleAgifySubmit = (data: { name: string }) => {
        clearErrors();
        agifyMutation.mutate(data.name);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            const isValid = schema.isValidSync({ name: value });

            if (isValid) {
                agifyMutation.mutate(value);
            }
        }, 3000);
    };

    useEffect(() => {
        // Очищаем таймер при размонтировании компонента или при изменении имени
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <>
            {" "}
            <form onSubmit={handleSubmit(handleAgifySubmit)}>
                <input
                    type="text"
                    placeholder="Введите имя"
                    {...register("name")}
                    onChange={handleNameChange}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <button type="submit">Отправить</button>
            </form>
            {agifyMutation.isError && (
                <p>Ошибка: {agifyMutation.error.message}</p>
            )}
            {age !== null && isValid && <p>Возраст: {age} лет</p>}
        </>
    );
};
