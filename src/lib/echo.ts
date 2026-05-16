import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false, 
    enabledTransports: ['ws'], 
    
    // ✅ Removido o "/api" - O padrão do Laravel é direto na raiz
    authEndpoint: 'http://localhost:8000/broadcasting/auth', 
    auth: {
        headers: {
            // Buscamos o token no momento da execução para garantir que não pegue um valor antigo
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
        },
    },
});