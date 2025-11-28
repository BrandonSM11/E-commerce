"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, User, Send } from "lucide-react";
import { Button } from "@/components/button/button";
import Navbar from "@/components/navbar/navbar";
import { useLanguage } from "@/contexts/LanguageContext";

// import { sendContactMessage } from "../service/contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberphone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    numberphone: "",
    message: "",
  });

  const {t} = useLanguage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: "", email: "",numberphone:"", message: "" };
    const emailRegex = /\S+@\S+\.\S+/;
    let hasError = false;

    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio";
      hasError = true;
    }
    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
      hasError = true;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
      hasError = true;
    }
    if(!formData.numberphone){
        newErrors.numberphone = "El numero es obligatorio"
        hasError = true
    }
    if (!formData.message) {
      newErrors.message = "El mensaje es obligatorio";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // try {
    //   await sendContactMessage(formData);
    //   alert("Mensaje enviado con éxito!");
    //   setFormData({ name: "", email: "", numberphone: "", message: "" });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-black">
      <Navbar />
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-2 text-center md:text-left">

            <h1 className="text-4xl font-bold mt-1 tracking-tight">
              {t("contact.title")}
            </h1>

            <p className="text-gray-500 mt-3 leading-relaxed">
             {t("contact.description")}
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-50">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{t("contact.email")}</p>
                  <p className="text-gray-500">info@luxurymotors.co</p>
                </div>  
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-50">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{t("contact.timeResponse")}</p>
                  <p className="text-gray-500">{t("contact.time")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.name")}
                </label>

                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                             focus:ring-2 focus:ring-black focus:border-black transition"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.email")}
                </label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                             focus:ring-2  focus:ring-black focus:border-black transition"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.phone")}
                </label>

                <input
                  name="numberphone"
                  type="text"
                  value={formData.numberphone}
                  onChange={handleChange}
                  placeholder="+57 300 343 4400"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                             focus:ring-2 focus:ring-black focus:border-black transition"
                />

                {errors.numberphone && (
                  <p className="text-red-500 text-sm mt-1">{errors.numberphone}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.message")}
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                             focus:ring-2  focus:ring-black focus:border-black transition"
                />

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* BUTTON */}
              <Button type="submit" variant="default">
                <Send className="w-4 h-4 mr-2" />
                {t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
