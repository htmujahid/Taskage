import React from "react";

function Feature() {
    return (
        <section className="">
            <div className="py-8 px-4 mx-auto container sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                        Designed for Freelancers like you
                    </h2>
                    <p className="text-gray-500 sm:text-xl">
                        Taskage, a project management tool for freelancers,
                        helps you to manage your projects, clients, and tasks in
                        one place. It also helps you to track your time and
                        productivity.
                    </p>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold ">Management</h3>
                        <p className="text-gray-500 ">
                            Manage your projects, clients, and tasks in one
                            place with Taskage. Organize your tasks with
                            categories and tags. Create personal and work
                            Scheduling at one place.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold ">
                            Kanban Board
                        </h3>
                        <p className="text-gray-500 ">
                            Keep your tasks organized with Kanban board. Create
                            multiple boards for different projects. Drag and
                            drop tasks to move them between columns.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            Meeting Notes
                        </h3>
                        <p className="text-gray-500 ">
                            Take meeting notes and share with your clients. Keep
                            you and your clients on the same page. Make backlog
                            of meeting notes for future reference.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 ">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            Task Scheduling
                        </h3>
                        <p className="text-gray-500 ">
                            Schedule your tasks and keep track of your progress.
                            Make your day more productive by scheduling your
                            tasks and get brief summary of your day.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold ">
                            Notes Keeping
                        </h3>
                        <p className="text-gray-500 ">
                            Keep your notes organized and accessible. Create
                            multiple notes for different projects. Make notes
                            similar to sticky notes and keep them organized.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12">
                            <svg
                                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold ">
                            Habit Tracking
                        </h3>
                        <p className="text-gray-500 ">
                            Track your habits and make them a part of your daily
                            routine. Create habits and track your progress. Make
                            your habits a part of your daily routine.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feature;
