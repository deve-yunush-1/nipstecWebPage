/** @format */

import {Suspense} from "react";

const AddAssessment = () => {
  return (
    <div>
      <h2>Assessment</h2>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddAssessment />
    </Suspense>
  );
}
