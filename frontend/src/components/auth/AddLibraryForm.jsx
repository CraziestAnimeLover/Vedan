import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { LIBRARY_API_END_POINT } from "@/utils/constant";

const AddLibraryForm = () => {
  const [formData, setFormData] = useState({
    pincode: "",
    timeSlot: "",
    dateJoining: "",
    fee: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.pincode || !formData.timeSlot || !formData.dateJoining || !formData.fee) {
      toast.error("Pincode, Time Slot, Date Joining, and Fee are required.");
      return;
    }

    if (formData.fee && isNaN(formData.fee)) {
      toast.error("Fee must be a valid number.");
      return;
    }

    try {
      const response = await axios.post(
        `${LIBRARY_API_END_POINT}/search`,  // changed to search endpoint
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Library search results found!");
        setFormData({
          pincode: "",
          timeSlot: "",
          dateJoining: "",
          fee: "",
        });
        setIsModalOpen(false); // Close the modal after successful submission
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
              <h1 className="font-bold text-2xl text-center mb-6">
                Library Zone*
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label>Pincode</Label>
                  <Input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <Label>Time Slot</Label>
                  <Input
                    type="text"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    placeholder="Enter time slot"
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <Label>Date Joining</Label>
                  <Input
                    type="text"
                    name="dateJoining"
                    value={formData.dateJoining}
                    onChange={handleChange}
                    placeholder="Enter joining date"
                    className="w-full"
                  />
                </div>

                <div>
                  <h1 className="font-bold text-2xl text-center mb-6">
                    Plans*
                  </h1>
                  <div className="mb-4">
                    <Label>Fee</Label>
                    <Input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      placeholder="Enter the fee for the plan"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLibraryForm;
