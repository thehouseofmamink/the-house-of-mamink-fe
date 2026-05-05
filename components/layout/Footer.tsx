import { MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import CreateByMe from "./CreateByMe";

export default function Footer() {
    return (
        <footer className="mt-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 text-yellow-100">
            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold mb-3 text-yellow-200">
                        The House of Mamink
                    </h2>
                    <p className="text-sm text-yellow-100/80">
                        Tempat berbagi cerita, karya, dan momen berharga.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-4">Kontak</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} />
                            <span>Kalinongko Rt 15/08, Kulon Progo</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} />
                            <span>thehouseofmamink@gmail.com</span>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div>
                    <h3 className="font-semibold mb-4">Aksi</h3>
                    <div className="space-y-3 text-sm">
                        <a
                            href="https://wa.me/6285169757490"
                            target="_blank"
                            className="flex items-center gap-3 hover:text-yellow-300"
                        >
                            <MessageCircle size={18} />
                            Chat WhatsApp
                        </a>

                        <Link href="/admin-login" className="block hover:text-yellow-300">
                            Login Admin
                        </Link>
                    </div>
                </div>
                </div>

                {/* Bottom */}
                <CreateByMe />
            </div>
        </footer>
    );
}
