import QuestionCard from "@/components/QuestionCard";
import React from "react";

const LatestQuestions = async () => {
    

       return (
        <div className="space-y-6">
            {/* {questions.documents.map(question => ( */}
                <QuestionCard key={1} ques={"AcademicTopper"} />
            {/* ))} */}
        </div>
    );
};

export default LatestQuestions;
