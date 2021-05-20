import React from "react";
import ChatBot from 'react-simple-chatbot';



export const ChatBotComponent = () => {
    const steps = [
        {
            id: '1',
            message: 'Привет! Чем я могу тебе помочь?',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Узнать расписание', trigger: '3' },
                { value: 2, label: 'Как стать клиетом фитнес-клуба?', trigger: '4' },
                { value: 3, label: 'Как записаться на тренировку?', trigger: '5' },
            ],
        },
        {
            id: '3',
            message: 'Мы работаем: Пн-Пт: 8:00-23:00, Сб-Вс: 9:00-21:00',
            trigger: '2',
        },
        {
            id: '4',
            message: 'Пожалуйста зарегистрируйтесь на сайте: http://localhost:3000/registration или приобретите абонемент в фитнес-клубе',
            trigger: "2",
        },
        {
            id: '5',
            message: 'Войдите в личный кабинет, там вы найдете всю необходиумю информацию!',
            trigger: "2",
        },

    ];

    return(
        <ChatBot
            headerTitle="Персональный помошник"
            recognitionEnable={true}
            steps={steps}/>
    );
}