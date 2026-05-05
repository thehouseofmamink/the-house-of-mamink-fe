"use client";

import { Mail, MapPin, Camera, Phone, Send } from "lucide-react";

type MedsosProps = {
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    telegram?: string;
    email?: string;
    maps?: string; // google maps link
};

export default function Medsos({
    instagram,
    tiktok,
    whatsapp,
    telegram,
    email,
    maps,
}: MedsosProps) {
    const items = [
        {
            icon: <Camera />,
            link: "https://instagram.com/username_kamu",
        },
        {
            icon: <Send />, // telegram
            link: "https://t.me/username_kamu",
        },
        {
            icon: <Phone />, // whatsapp
            link: "https://wa.me/628123456789",
        },
        {
            icon: <Mail />,
            link: "mailto:emailkamu@gmail.com",
        },
        {
            icon: <MapPin />,
            link: "https://maps.google.com/",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
        {items.map((item, index) =>
            item.link ? (
            <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-300 shadow"
            >
                {item.icon}
            </a>
            ) : null
        )}
        </div>
    );
}