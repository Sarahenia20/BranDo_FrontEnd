import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { Canvas } from '@react-three/fiber';
import { Center, Plane } from '@react-three/drei';
import { useState } from 'react';

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
import Shirt from '../canvas/Shirt'; 
import CameraRig from '../canvas/CameraRig'; 
import { ArrowLeftIcon, UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'; // Ensure this is added
import { useNavigate } from 'react-router-dom';


const bounceAnimation = {
  initial: { y: 0 },
  animate: { y: [0, -20, 0] },
  transition: { duration: 2, repeat: Infinity },
};

const cards = [/* Define your card data here */];

const CHome = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [isCustomizing, setIsCustomizing] = useState(false); // State to control customization mode

  const handleBackClick = () => {
    navigate('/main');
  };

  const handleCustomizeClick = () => {
    setIsCustomizing(true);
    state.intro = false; // Assuming this is the way to control the intro state
  };

  const blobAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'mirror',
    },
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home relative overflow-hidden w-screen h-screen">
          {/* Background Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 0, isCustomizing ? 2 : 0], fov: isCustomizing ? 50 : 75 }} 
            gl={{ preserveDrawingBuffer: true }}
            className="absolute inset-0 z-[-1]"
          >
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[2.5, 8, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />

            <Plane
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, -1, 0]} 
              args={[10, 10]} 
              receiveShadow
            >
              <shadowMaterial attach="material" opacity={0.3} />
            </Plane>

            <CameraRig>
              <Center position={isCustomizing ? [0, 0, 0] : [-2, 0, 0]}>
                <Shirt scale={isCustomizing ? [2, 2, 2] : [1, 1, 1]} />
              </Center>
            </CameraRig>
          </Canvas>

          {/* Page Content */}
          <div className="absolute inset-0 flex justify-between items-start p-6">
            {/* Back Button */}
            <button 
              className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
              <span className="text-gray-600">Back</span>
            </button>

            {/* User Icon and Menu */}
          </div>

          <motion.header className="flex justify-center items-center" {...slideAnimation("down")}>
            {/* Logo and Logo Title */}
            <div className="flex items-center">
              <img 
                src='./BranDo.png'
                alt="logo"
                className="w-20 h-20 object-contain"  
              />
              <img 
                src='./BranDoTitle.png'  
                alt="logo title"
                className="w-16 h-16 object-contain ml-0.5"
              />
            </div>
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                TSHIRT <br className="xl:block hidden" /> Studio
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-700 text-base">
                If you need merch or Staff outfit for your Brand. <strong>We bring your vision to life.</strong>{" "}Define your own style.
              </p>
              <CustomButton 
                type="filled"
                title="Customize your Tshirt"
                handleClick={handleCustomizeClick} // Trigger customization mode
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>

          {/* Animated Blobs */}
          <motion.div
            className="absolute top-1/2 left-1/4 h-96 w-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            initial="initial"
            animate="animate"
            variants={blobAnimation}
            transition={{
              ...blobAnimation.transition,
              duration: 4,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 h-80 w-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            initial="initial"
            animate="animate"
            variants={blobAnimation}
            transition={{
              ...blobAnimation.transition,
              duration: 4,
            }}
          />
          <motion.div
            className="absolute top-1 right-1/4 h-80 w-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            initial="initial"
            animate="animate"
            variants={blobAnimation}
            transition={{
              ...blobAnimation.transition,
              duration: 4,
            }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  variants={bounceAnimation}
                >
                  <Card
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    link={card.link}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CHome;
