import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom'; // Assuming jobId is passed in the URL params

const JobDescription = () => {
    const { jobId } = useParams(); // Get jobId from the URL params
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);
    const singleJob = useSelector(store => store.job.singleJob); // Assuming job details are stored in Redux
    const [isApplied, setIsApplied] = useState(false);

    // Fetch the job details if not already available
    useEffect(() => {
        if (!singleJob || singleJob._id !== jobId) {
            axios.get(`${APPLICATION_API_END_POINT}/job/${jobId}`)
                .then((res) => {
                    dispatch(setSingleJob(res.data.job)); // Save the job details in Redux
                })
                .catch((error) => {
                    toast.error('Failed to fetch job details');
                });
        }
    }, [dispatch, jobId, singleJob]);

    useEffect(() => {
        if (singleJob?.applications?.some(application => application.applicant === user?._id)) {
            setIsApplied(true); // Check if the user already applied for this job
        }
    }, [singleJob, user]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { userId: user._id },
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Update job applications in Redux
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    if (!singleJob) {
        return <div>Loading...</div>; // Handle loading state while job details are being fetched
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h1 className="font-bold text-lg md:text-xl">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} px-4 py-2`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-gray-300 font-medium py-4 text-lg">Job Description</h1>

            <div className="my-4">
                <h2 className="font-bold my-2 text-base">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h2>
                <h2 className="font-bold my-2 text-base">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h2>
                <h2 className="font-bold my-2 text-base">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h2>
                <h2 className="font-bold my-2 text-base">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span></h2>
                <h2 className="font-bold my-2 text-base">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h2>
                <h2 className="font-bold my-2 text-base">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length || 0}</span></h2>
            </div>
        </div>
    );
};

export default JobDescription;
