import React, { useEffect, useState } from 'react'
import { Grid, Col, Card, Text, Metric, TabList, Tab } from "@tremor/react";
import axios from 'axios';
import { CommonTagsGraph } from '../components/CommonTagsGraph';
import { CounUsersCard } from "../components/CounUsersCard";
import { CountPostByTagCard } from '../components/CountPostByTagCard';
import { UsersTable } from '../components/UsersTable';
import Swal from 'sweetalert2';

export default function DashboardAdmin() {
    const [siteUsers, setSiteUsers] = useState(0)
    const [sitePosts, setSitePosts] = useState(0)
    const [siteTags, setSiteTags] = useState([])
    const [selectedView, setSelectedView] = useState(1)
    const [users, setUsers] = useState([])
    const [tag, setTag] = useState("")

    const countUsers = async (isPremium) => {
        let query = isPremium ? `?isPremium=${isPremium}` : ""
        const res = await axios.get(`/countUsers${query}`)
        if (res.status === 200) {
            setSiteUsers(Number(res.data))
        }
    }
    const countPostByTag = async (tag) => {
        setTag(tag)
        let query = tag ? `?tag=${tag}` : ""
        const res = await axios.get(`/countPosts${query}`)
        if (res.data) {
            setSitePosts(res.data)
        }
    }
    const commonTags = async () => {
        const res = await axios.get("/commonTags")
        if (res.data) {
            setSiteTags(res.data)
        }
    }
    const getAllUsers = async (isPremium) => {
        let query = isPremium ? `?isPremium=${isPremium}` : ""
        const res = await axios.get(`/allUsers${query}`)
        if (res.status === 200) {
            setUsers(res.data)
        }
    }
    const getActiveUsers = async (isActive) => {
        const res = await axios.get(`/getActiveUsers?isActive=${isActive}`)
        if (res.status === 200) {
            setUsers(res.data)
        }
    }
    const confirmDeleteUser = async (id, username, email) => {
        try {
            const result = await Swal.fire({
                title: "Confirmar Baneo",
                text: `Esta seguro de banear a ${username}?`,
                showCancelButton: true,
                showConfirmButton: true
            })
            if (result.isConfirmed) {
                const res = await axios.delete(`/user/${id}`)
                if (res.status === 200) {
                    const response = await axios.post('/subcriptionsEmail', {
                        username: username,
                        email: email,
                        type: "Baneo"
                    })
                    if (response.status === 200) {
                        await Swal.fire({
                            title: "Baneo confirmado",
                            text: `Usuario baneado! 😱 ${response.data}`,
                            showConfirmButton: true
                        })
                        await getAllUsers()
                    }
                }
            }
        } catch (error) {
            await Swal.fire({
                title: "Error al banear usuario",
                text: error.message,
                timer: 3000
            })
        }
    }
    const confirmUnbanUser = async (id, username, email) => {
        try {
            const result = await Swal.fire({
                title: "Confirmar desbaneo",
                text: `Esta seguro de desbanear a ${username}?`,
                showCancelButton: true,
                showConfirmButton: true
            })
            if (result.isConfirmed) {
                const res = await axios.put(`/unbanUser/${id}`)
                if (res.status === 200) {
                    const response = await axios.post('/subcriptionsEmail', {
                        username: username,
                        email: email,
                        type: "Desbaneo"
                    })
                    if (response.status === 200) {
                        await Swal.fire({
                            title: "Desbaneo confirmado",
                            text: `Usuario desbaneado! 🤗 ${response.data}`,
                            showConfirmButton: true
                        })
                        await getAllUsers()
                    }
                }
            }
        } catch (error) {
            await Swal.fire({
                title: "Error al banear usuario",
                text: error.message,
                timer: 3000
            })
        }
    }
    useEffect(() => {
        countUsers()
        countPostByTag()
        commonTags()
        getAllUsers()
    }, [])
    return (
        <div className='m-auto text-center'>
            <Text className='text-center text-2xl mt-3'>Dashboard admin</Text>
            <TabList defaultValue={selectedView}
                className='w-screen mt-6'
                onValueChange={value => setSelectedView(Number(value))}>
                <Tab value={1} text='Principal' />
                <Tab value={2} text='Detalles' />
            </TabList>
            {
                selectedView === 1 ? (
                    <>
                        <Grid className="gap-5 mt-3"
                            numCols={1}
                            numColsMd={2}
                            numColsLg={2}>
                            <Col>
                                <CounUsersCard countUsers={siteUsers} onSearch={countUsers} />
                            </Col>
                            <Col>
                                <CountPostByTagCard
                                    countPosts={sitePosts}
                                    onSearch={countPostByTag}
                                    tag={tag} />
                            </Col>
                        </Grid>
                        <CommonTagsGraph data={siteTags} />
                    </>
                ) : (
                    <UsersTable users={users}
                        onSearch={getAllUsers}
                        onSearchBan={getActiveUsers}
                        onDeleteUser={confirmDeleteUser}
                        onUbanUser={confirmUnbanUser} />
                )
            }
        </div>
    )
}
