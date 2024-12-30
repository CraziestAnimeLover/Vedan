import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/companies`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        toast.error('Failed to fetch companies');
      }
    };
    fetchCompanies();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <h1 className='text-2xl font-bold mb-5'>Companies</h1>
        <div className='mb-4'>
          <Input
            type='text'
            placeholder='Search by company name'
            value={search}
            onChange={handleSearchChange}
            className='w-full'
          />
        </div>
        <div className='overflow-x-auto'>
          <Table className='min-w-full border-collapse border border-gray-200'>
            <TableHead>
              <TableRow>
                <TableCell className='border border-gray-200'>Name</TableCell>
                <TableCell className='border border-gray-200'>Industry</TableCell>
                <TableCell className='border border-gray-200'>Location</TableCell>
                <TableCell className='border border-gray-200'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className='border border-gray-200'>{company.name}</TableCell>
                  <TableCell className='border border-gray-200'>{company.industry}</TableCell>
                  <TableCell className='border border-gray-200'>{company.location}</TableCell>
                  <TableCell className='border border-gray-200'>
                    <Button variant='outline'>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
