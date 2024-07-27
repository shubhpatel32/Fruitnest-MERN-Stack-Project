import React from 'react';
import { Link } from 'react-router-dom';
import Fruits from './Fruits';
import Heading from '../../Components/Heading/Heading';


function Shop() {
    const fruits = [
        {
            id: 1,
            name: "Apple",
            price: 50,
            image: 'Images/apple.jpg',
            quantity: 1,
        },
        {
            id: 2,
            name: "Orange",
            price: 25,
            image: "Images/orange.jpg",
            quantity: 1,
        },
        {
            id: 3,
            name: "Grapes",
            price: 20,
            image: "Images/grapes.jpg",
            quantity: 1,
        },
        {
            id: 4,
            name: "Mango",
            price: 90,
            image: "Images/mango.jpeg",
            quantity: 1,
        },
        {
            id: 5,
            name: "Pineapple",
            price: 20,
            image: "Images/pineapple.jpg",
            quantity: 1,
        },
        {
            id: 6,
            name: "Strawberry",
            price: 45,
            image: "Images/strawberry.jpg",
            quantity: 1,
        },
        {
            id: 7,
            name: "Guava",
            price: 30,
            image: "Images/guava.jpg",
            quantity: 1,
        },
        {
            id: 8,
            name: "Banana",
            price: 15,
            image: "Images/banana.webp",
            quantity: 1,
        },
        {
            id: 9,
            name: "Chickoo",
            price: 20,
            image: "Images/chickoo.webp",
            quantity: 1,
        },
        {
            id: 10,
            name: "Papaya",
            price: 25,
            image: "Images/papaya.webp",
            quantity: 1,
        },
        {
            id: 11,
            name: "Custard Apple",
            price: 30,
            image: "Images/custard-apple.webp",
            quantity: 1,
        },
        {
            id: 12,
            name: "Raspberry",
            price: 15,
            image: "Images/raspberry.webp",
            quantity: 1,
        },
        {
            id: 13,
            name: "Kiwi",
            price: 100,
            image: "Images/kiwi.jpg",
            quantity: 1,
        },
        {
            id: 14,
            name: "Watermelon",
            price: 20,
            image: "Images/watermelon.webp",
            quantity: 1,
        },
        {
            id: 15,
            name: "Litchi",
            price: 40,
            image: "Images/litchi.jpg",
            quantity: 1,
        },
        {
            id: 16,
            name: "Jamun",
            price: 10,
            image: "Images/jamun.webp",
            quantity: 1,
        },
        {
            id: 17,
            name: "Pomegranate",
            price: 70,
            image: "Images/pomegranate.webp",
            quantity: 1,
        },
        {
            id: 18,
            name: "Plum",
            price: 50,
            image: "Images/plums.jpg",
            quantity: 1,
        },
        {
            id: 19,
            name: "Apricot",
            price: 120,
            image: "Images/apricot.webp",
            quantity: 1,
        },
        {
            id: 20,
            name: "Pear",
            price: 60,
            image: "Images/pear.jpg",
            quantity: 1,
        },
    ];


    return (
        <div>
            <Heading name1="Our Shop" name2="Shop" />
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-2">
                {fruits.map((fruit, index) => (
                    <Fruits key={index} fruit={fruit} />
                ))}
            </section>
        </div>
    );
};

export default Shop;
