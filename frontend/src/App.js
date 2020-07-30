import React from "react";
import { Route, Switch, Link } from "react-router-dom"
import "./App.css"
import { useQuery } from '@apollo/react-hooks';
import { QUESTION_QUERY, QUESTION_LIST_QUERY } from "./query"


const QuestionPage = (props) => {
        // uncomment to see which props are passed from router
        //console.log(props)
        // because we made the slug parameter dynamic in route component,
        // urlParameters will look like this { slug: 'slug-of-the-selected-question' }
        const urlParameters = props.match.params
        const { loading, error, data } = useQuery(QUESTION_QUERY, { 
            variables:{slug:urlParameters.slug}
        });
        if (loading) return <div>Loading</div>
        if (error) return <div>Unexpected Error: {error.message}</div>
      
        return (
            <div className="question-page">
            <Link to="/" className="back-button" >Main Page</Link>
                {data && data.question && 
                    <div className="question-page-box">
                        <img 
                            className="question-page-image"
                            src={data.question.userImageUrl} 
                            alt={data.question.userName + " image"} 
                            title={data.question.userName + " image"} 
                        />
                        <div className="question-page-info">
                            <h1>{data.question.userName}</h1>
                            <p>Date: {data.question.date}</p>
                            <br />
                            <p>{data.question.body}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }

const MainPage = (props) => {
        const { loading, error, data } = useQuery(QUESTION_LIST_QUERY);
        
        // when query starts, loading will be true until the response will back.
        // At this time this will be rendered on screen
        if (loading) return <div>Loading</div>
        
        // if response fail, this will be rendered
        if (error) return <div>Unexpected Error: {error.message}</div>
        //if query succeed, data will be available and render the data
        return(
            <div className="main-page">
                {data && data.questionList &&
                    data.questionList.map(question => (
                        <div className="question-card" key={question.slug}>
                            <img 
                                className="question-card-image"
                                src={question.userImageUrl} 
                                alt={question.userName + " image"} 
                                title={question.userName + " image"} 
                            />
                            <p className="question-card-name">{question.userName}</p>
                            <br />
                            <p>{question.body}</p>
                            <Link to={`/question/${question.slug}`} className="question-card-link" />
                        </div>
                    ))
                }
            </div>
        )
    }



const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={MainPage} ></Route>
                // colon before slug means it is a dynamic value
                // that makes slug parameter anything
                // like: /question/the-matrix-1999   or /question/anything
                <Route exact path="/question/:slug" component={QuestionPage} ></Route>
            </Switch>
        </div>
    )
}
export default App