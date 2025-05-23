import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../../../ui/Card";
import { Input } from "@/components/ui/input";

const Multiple = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    orgName: "",
    opendate: "",
    vedannId: "",
    address: "",
    phone: "",
    email: "",
    founders: [{ name: "" }],
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/gym/organizations');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error('Error fetching organizations');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFounderChange = (index, value) => {
    const updatedFounders = [...formData.founders];
    updatedFounders[index].name = value;
    setFormData({ ...formData, founders: updatedFounders });
  };

  const addFounder = () => {
    setFormData({ ...formData, founders: [...formData.founders, { name: "" }] });
  };

  const removeFounder = (index) => {
    const updatedFounders = formData.founders.filter((_, i) => i !== index);
    setFormData({ ...formData, founders: updatedFounders });
  };

  const handleAddCard = async () => {
    try {
      if (editIndex === null) {
        // Add new card
        const response = await fetch('http://localhost:8000/api/gym/organizations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newOrg = await response.json();
          setCards([...cards, newOrg]);
        } else {
          console.error('Error creating organization');
        }
      } else {
        // Update existing card
        const response = await fetch(`http://localhost:8000/api/gym/organizations/${cards[editIndex]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedOrg = await response.json();
          const updatedCards = [...cards];
          updatedCards[editIndex] = updatedOrg;
          setCards(updatedCards);
        } else {
          console.error('Error updating organization');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form after adding or updating
    setFormData({
      orgName: '',
      opendate: '',
      vedannId: '',
      address: '',
      phone: '',
      email: '',
      founders: [{ name: '' }],
    });
    setShowForm(false);
    setEditIndex(null); // Reset edit index
  };

  const handleDeleteCard = async (index) => {
    try {
      const response = await fetch(`http://localhost:8000/api/gym/organizations/${cards[index]._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCards(cards.filter((_, i) => i !== index));
      } else {
        console.error('Error deleting organization');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditCard = (index) => {
    setFormData(cards[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setShowForm(true); setEditIndex(null); }}>Add Organization</Button>
      </div>

      {showForm ? (
        <div className="p-4 border rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Side - Organization Details */}
            <div>
              <Input
                type="text"
                name="orgName"
                placeholder="Organization Name"
                value={formData.orgName}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="text"
                name="vedannId"
                placeholder="Vedann ID"
                value={formData.vedannId}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="date"
                name="opendate"
                placeholder="Open Date"
                value={formData.opendate}
                onChange={handleChange}
                className="mb-2"
              />
            </div>

            {/* Right Side - Founders */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Founders</h3>
              {formData.founders.map((founder, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Founder ${index + 1}`}
                    value={founder.name}
                    onChange={(e) => handleFounderChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button variant="destructive" onClick={() => removeFounder(index)}>Remove</Button>
                  )}
                </div>
              ))}
              <Button onClick={addFounder} className="mt-2">Add Founder</Button>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddCard}>{editIndex !== null ? "Update" : "Save"}</Button>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {cards.map((card, index) => (
            <Card key={index} className="p-4 shadow-lg relative mb-4">
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Left - Organization Info */}
                  <div>
                    <p><strong>{card.orgName} ({card.vedannId})</strong></p>
                    <p><strong>Address:</strong> {card.address}</p>
                  </div>

                  {/* Right - Founders */}
                  <div>
                    <h3 className="font-semibold">Founders:</h3>
                    <ul>
                      {card.founders.map((founder, i) => (
                        <li key={i} className="ml-4">- {founder.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-4">
                  <Button onClick={() => handleEditCard(index)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteCard(index)}>Delete</Button>
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
