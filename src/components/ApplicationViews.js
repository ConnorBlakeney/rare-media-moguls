import React from "react";
import { Nav } from "./nav/Nav";
import { Route } from "react-router-dom";
import "./Rare.css";
import { PostProvider } from "./posts/PostProvider";
import { CategoryProvider } from "./categories/CategoryProvider";
import { PostForm } from "./posts/PostForm";
import { PostList } from "./posts/PostList";
import { CategoryButtonList } from "./categories/CategoryButtonList";
import { CategoryForm } from "./categories/CategoryForm";
import { TagProvider } from "./tags/TagProvider";
import { CategoriesList } from "./categories/CategoriesList"
import { TagsList } from "./tags/TagsList"
import { PostDetails } from "./posts/PostDetail"
import { PostTagProvider } from "./posts/PostTags/PostTagProvider"
import { CommentForm } from "./comments/CommentForm"
import { CommentProvider } from "./comments/CommentProvider";



export const ApplicationViews = (props) => {

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>

            <Route path="/" render={(props) => (
                    <nav className="cont--nav">
                        <Nav {...props} />
                    </nav>)} />
            
            <PostProvider>
                <CategoryProvider>
                    <Route exact path="/new_post" render={(props) =>
                        <PostForm {...props} />}
                    />
                </CategoryProvider>
            </PostProvider>

            <TagProvider>
                <PostTagProvider>
                    <PostProvider>
                        <Route path="/posts/:postId(\d+)" render={
                            props => <PostDetails {...props} />
                        } />
                    </PostProvider>
                </PostTagProvider>
            </TagProvider>

                <PostProvider>
                    <CategoryProvider>
                        <Route exact path="/new_post" render={
                            props => <PostForm {...props} />
                        } />
                        <Route exact path="/posts/edit/:postId(\d+)" render={
                            props => <PostForm {...props} />
                        } />
                    </CategoryProvider>
                </PostProvider>

                <CategoryProvider>
                    <Route exact path="/categories/create" render={(props) =>
                        <CategoryForm {...props} />}
                    />
                    <Route exact path="/categories" render={(props) =>
                        <CategoriesList {...props} />}
                    />
                </CategoryProvider>

                <CategoryProvider>
                    <PostProvider>
                        <>
                            <Route exact path="/" render={(props) => (
                                <>
                                    <div className="main-wrap">
                                        <div className="top-spacer"></div>
                                        <div className="mid-section">
                                            <div className="left-main">
                                                <PostList {...props}></PostList>

                                            </div>
                                            <div className="divider"></div>
                                            <div className="right-main">
                                                <CategoryButtonList
                                                    {...props} />
                                    </div>
                                        </div>
                                        <div className="bottom-spacer"></div>
                                    </div>
                                </>
                            )} />
                        </>
                    </PostProvider>
                </CategoryProvider>
                <CommentProvider>
                    <Route path="/new_comment/:postId(\d+)" render={(props) =>
                            <CommentForm {...props} />}
                        />

                </CommentProvider>

<<<<<<< HEAD

                    <PostProvider>
                        <Route path="/posts/:postId(\d+)" render={(props) =>
                            <PostDetails {...props} />}
                        />
                    </PostProvider>

=======
                    <CategoryProvider>
                        <Route exact path="/categories/create" render={props =>
                            <CategoryForm {...props} />}
                        />
                    </CategoryProvider>
>>>>>>> main

                        <TagProvider>
                            <Route exact path="/tags" render={props =>
                                <TagsList {...props} />}
                            />
                        </TagProvider>
            </main>
        </>
    )};