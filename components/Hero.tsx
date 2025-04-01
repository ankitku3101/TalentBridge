import React from 'react'
import { FlipWords } from './ui/flip-words'
import WorldMap from './ui/world-map';
import BackgroundGradient from './BackgroundGradient';

const words = ["oppurtunities", "collaboration", "connections", "recruitment"];

function Hero() {
  return (
    <section id='hero' className='relative flex flex-col items-center justify-center h-screen'>
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="right" id={10} />
        <div className='text-center'>
            <h1 className='text-7xl font-semibold tracking-tighter m-2'>
                Talent Bridge
            </h1>
            <h2 className='text-2xl tracking-tight'>
                Empowering careers, expanding networks, and streamlining
                <FlipWords words={words} /> <br />
            </h2>
        </div>
        <div className='w-2/3 h-1/4 p-10'>
            <WorldMap
                dots={[
                {
                    start: {
                    lat: 64.2008,
                    lng: -149.4937,
                    }, // Alaska (Fairbanks)
                    end: {
                    lat: 34.0522,
                    lng: -118.2437,
                    }, // Los Angeles
                },
                {
                    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                },
                {
                    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                },
                {
                    start: { lat: 51.5074, lng: -0.1278 }, // London
                    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                },
                {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                },
                {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                },
                ]}
            />
        </div>
    </section>
  )
}

export default Hero