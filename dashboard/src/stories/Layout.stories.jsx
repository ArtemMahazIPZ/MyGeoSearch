import React from 'react';
import Layout from '../components/Layout';

export default {
    title: 'Components/Layout',
    component: Layout,
    argTypes: {
        children: { control: 'text', description: 'Content to be rendered inside the layout' },
    },
};

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Welcome to MyGeoSearch Dashboard',
};

export const WithHeading = Template.bind({});
WithHeading.args = {
    children: (
        <div>
            <h1 style={{ color: '#1976d2' }}>Dashboard Overview</h1>
            <p>This is a detailed view of the dashboard.</p>
        </div>
    ),
};

export const WithList = Template.bind({});
WithList.args = {
    children: (
        <ul style={{ paddingLeft: '20px' }}>
            <li>Users: 150</li>
            <li>Types: 25</li>
            <li>Locations: 300</li>
        </ul>
    ),
};