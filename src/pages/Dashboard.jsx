import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from '../config/motion';
import '../styles.css'; 
import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";  
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import LightBlobs from '../components/LightBlobs'; 
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
  
    useEffect(() => {
        setLoading(true);
        axiosClient
          .get(`/dashboard`)
          .then((res) => {
            setLoading(false);
            setData(res.data);
            return res;
          })
          .catch((error) => {
            setLoading(false);
            return error;
          });
      }, []);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/main');
    };

    const handleSurveysClick = () => {
        navigate('/surveys');
    };

    return (
        <PageComponent title="">
            {/* Animated Light Blobs in the Background */}
            <Canvas className="absolute inset-0 z-[-1] overflow-hidden">
                <LightBlobs color="yellow" position={[-2, 1, 0]} />
                <LightBlobs color="pink" position={[2, -1, 0]} />
                <LightBlobs color="blue" position={[0, 2, -2]} />
            </Canvas>

            {/* Header Section */}
            <div
                style={{
                    width: '100%',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',  // Center the content
                    alignItems: 'center',
                    padding: '1rem',
                    zIndex: 100,  // Keep header on top
                    backgroundColor: 'white',  // Add background color to avoid overlap
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',  // Add subtle shadow
                    height: '80px',  // Fixed height for the header
                }}
            >
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={headContainerAnimation}
                    style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}
                >
                    {/* Back Button */}
                    <motion.button 
                        className="flex items-center space-x-1 p-2 rounded-full"
                        onClick={handleBackClick}
                        {...headContentAnimation}
                        style={{ position: 'absolute', left: '1rem' }}  // Position on the left
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
                        <span className="text-gray-600">Back</span>
                    </motion.button>

                    {/* Logo on the Left */}
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        variants={headContainerAnimation}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            position: 'absolute',
                            left: '6rem',  // Moved the logo to the right
                        }}
                    >
                        <motion.img 
                            src='./BranDo.png' 
                            alt="logo" 
                            className="w-20 h-20 object-contain"  
                            {...headContentAnimation}
                            style={{ marginRight: '0.5rem' }}
                        />
                        <motion.img 
                            src='./BranDoTitle.png'  
                            alt="logo title" 
                            className="w-32 h-20 object-contain"  
                            {...headTextAnimation}
                        />
                    </motion.div>

                    {/* Dashboard Title in the Center */}
                    <motion.h1
                        className="text-2xl font-bold text-gray-800"
                        {...headTextAnimation}
                        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}  // Centered title
                    >
                        Dashboard
                    </motion.h1>
                </motion.div>
            </div>

            {/* Main Dashboard Content */}
            <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Center the content vertically */}
                <div>
                    {loading && <div className="flex justify-center">Loading...</div>}
                    {!loading && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                        <DashboardCard
                          title="Total Surveys"
                          className="order-1 lg:order-2"
                          style={{ animationDelay: '0.1s' }}
                        >
                          <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                            {data.totalSurveys}
                          </div>
                        </DashboardCard>
                        <DashboardCard
                          title="Total Answers"
                          className="order-2 lg:order-4"
                          style={{ animationDelay: '0.2s' }}
                        >
                          <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                            {data.totalAnswers}
                          </div>
                        </DashboardCard>
                        <DashboardCard
                          title="Latest Survey"
                          className="order-3 lg:order-1 row-span-2"
                          style={{ animationDelay: '0.2s' }}
                        >
                          {data.latestSurvey && (
                            <div>
                              <img
                                src={data.latestSurvey.image_url}
                                className="w-[240px] mx-auto"
                              />
                              <h3 className="font-bold text-xl mb-3">
                                {data.latestSurvey.title}
                              </h3>
                              <div className="flex justify-between text-sm mb-1">
                                <div>Create Date:</div>
                                <div>{data.latestSurvey.created_at}</div>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <div>Expire Date:</div>
                                <div>{data.latestSurvey.expire_date}</div>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <div>Status:</div>
                                <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <div>Questions:</div>
                                <div>{data.latestSurvey.questions}</div>
                              </div>
                              <div className="flex justify-between text-sm mb-3">
                                <div>Answers:</div>
                                <div>{data.latestSurvey.answers}</div>
                              </div>
                              <div className="flex justify-between">
                                <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                                  <PencilIcon className="w-5 h-5 mr-2" />
                                  Edit Survey
                                </TButton>

                                <TButton link>
                                  <EyeIcon className="w-5 h-5 mr-2" />
                                  View Answers
                                </TButton>
                              </div>
                            </div>
                          )}
                          {!data.latestSurvey && (
                            <div className="text-gray-600 text-center py-16">
                              Your don't have surveys yet
                            </div>
                          )}
                        </DashboardCard>
                        <DashboardCard
                          title="Latest Answers"
                          className="order-4 lg:order-3 row-span-2"
                          style={{ animationDelay: '0.3s' }}
                        >
                          {data.latestAnswers?.length ? (
                            <div className="text-left">
                              {data.latestAnswers.map((answer) => (
                                <a
                                  href="#"
                                  key={answer.id}
                                  className="block p-2 hover:bg-gray-100/90"
                                >
                                  <div className="font-semibold">{answer.survey.title}</div>
                                  <small>
                                    Answer Made at:
                                    <i className="font-semibold">{answer.end_date}</i>
                                  </small>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-600 text-center py-16">
                              Your don't have answers yet
                            </div>
                          )}
                        </DashboardCard>
                      </div>
                    )}
                </div>

                {/* Green Gradient Button */}
                <motion.button
                    className="mt-12 px-8 py-4 rounded-full text-white font-bold text-lg"
                    onClick={handleSurveysClick}
                    whileHover={{ scale: 1.1 }}
                    style={{
                        background: 'linear-gradient(90deg, #00C853 0%, #B2FF59 100%)',
                        boxShadow: '0px 0px 20px rgba(0, 200, 83, 0.5)',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    Go to Surveys
                </motion.button>
            </div>
        </PageComponent>
    );
};

export default Dashboard;
