import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import { 
  headContainerAnimation, 
  headContentAnimation, 
  headTextAnimation, 
  slideAnimation 
} from '../config/motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const CHome = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home relative" {...slideAnimation('left')}>
          {/* Background Blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-40 w-64 h-64 rounded-full absolute top-10 left-10 filter blur-2xl"></div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 opacity-40 w-64 h-64 rounded-full absolute top-32 right-10 filter blur-2xl"></div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 opacity-40 w-64 h-64 rounded-full absolute bottom-10 left-1/3 filter blur-2xl"></div>
          </div>

          <motion.header className="flex justify-between items-center z-10 relative" {...slideAnimation("down")}>
            <div className="flex items-center">
              <ArrowLeftIcon 
                className="w-8 h-8 cursor-pointer" 
                onClick={() => (window.location.href = '/main')}
              />
              <motion.img 
                src="./BranDo.png" 
                alt="logo" 
                className="w-24 h-24 object-contain ml-4"
              />
            </div>
          </motion.header>

          <motion.div className="home-content z-10 relative" {...headContainerAnimation}>
          <motion.div {...headTextAnimation}>
            <h1 className="head-text">
              TShirt<br className="xl:block hidden" /> Studio
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-5"
          >
            <p className="max-w-md font-normal text-gray-600 text-base">
            Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and get your band merch started .
            </p>
              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default CHome;
