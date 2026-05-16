import { useEffect } from 'react';
import { echo } from '../lib/echo';

// Adicione | string para aceitar ambos os tipos
export function useRideNotifications(userId: number | string | undefined) {
    useEffect(() => {
        if (!userId) return;

        console.log(`Conectando ao canal do motorista: App.Models.User.${userId}`);

        const channel = echo.private(`App.Models.User.${userId}`)
            .notification((notification: any) => {
                console.log('Notificação recebida via Reverb:', notification);
                alert(notification.message); 
            });

        return () => {
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, [userId]);
}