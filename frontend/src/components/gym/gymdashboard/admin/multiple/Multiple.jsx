import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Multiple = () => {
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({ orgName: '', display: '', address: '', phone: '', email: '' });
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCard = () => {
        if (editIndex !== null) {
            const updatedCards = [...cards];
            updatedCards[editIndex] = formData;
            setCards(updatedCards);
            setEditIndex(null);
        } else {
            setCards([...cards, formData]);
        }
        setFormData({ orgName: '', display: '', address: '', phone: '', email: '' });
        setShowForm(false);
    };

    const handleDeleteCard = (index) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    const handleEditCard = (index) => {
        setFormData(cards[index]);
        setEditIndex(index);
        setShowForm(true);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button onClick={() => { setShowForm(true); setEditIndex(null); }}>Add</Button>
            </div>
            {showForm ? (
                <div className="p-4 border rounded-lg shadow-md mb-4">
                    <Input name="orgName" placeholder="Organization Name" value={formData.orgName} onChange={handleChange} className="mb-2" />
                    <Input name="display" placeholder="Display" value={formData.display} onChange={handleChange} className="mb-2" />
                    <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="mb-2" />
                    <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="mb-2" />
                    <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2" />
                    <div className="flex gap-2">
                        <Button onClick={handleAddCard}>{editIndex !== null ? "Update" : "Save"}</Button>
                        <Button onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                </div>
            ) : (
                <div className=" w-full ">
                    {cards.map((card, index) => (
                        <Card key={index} className="p-4 shadow-lg relative mb-4">
                            <CardContent>
                               
                                <p>{card.display}</p>
                                <p>{card.address}</p>
                                <div 
                                className=" mx-96 flex gap-4"
                                >
                                <Button onClick={() => handleEditCard(index)}>Edit</Button>
                                <Button onClick={() => handleDeleteCard(index)}>Delete</Button>
                            </div>
                            </CardContent>
                           
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Multiple;
