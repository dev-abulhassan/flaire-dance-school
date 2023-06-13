import React from "react";
import useAdmin from "../../../../hook/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../../../../provaider/AuthProvider";
import useInstructor from "../../../../hook/useInstructor";
import toast from "react-hot-toast";

const AllClassCard = ({ item }) => {
  const { _id, image, name, instructor, description, seats, price } = item;
  const { user, loading, setloading } = useContext(AuthContext);

  const { isAdmin } = useAdmin(user?.email);
  const { isInstructor } = useInstructor(user?.email);
  const handleSelectClass = () => {
    const selectedClassData = {
      class_id: _id,
      image,
      name,
      instructor,
      student_email: user?.email,
      price,
      user: user?.name,
    };
    fetch("http://localhost:5000/selectedClass", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectedClassData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("class addedd successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="group">
      <div className="p-8 max-w-lg   rounded-2xl hover:shadow-sm  group-hover:shadow-rose-400 flex flex-col items-center">
        <img src={image} className="shadow rounded-lg overflow-hidden border" />
        <div className="mt-8 md:text-left">
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl">{instructor}</h4>
            <h4 className="font-bold text-xl">{name}</h4>
            <p className="mt-2 text-gray-600">
              Create Exercises for any subject with the topics you and your
              students care about.
            </p>
          </div>

          <div className="flex items-center justify-between py-2">
            <p>Available seats {seats}</p>
            <p>Price: {price}</p>
          </div>
        </div>
        <div className="pt-2">
          <button
            disabled={isAdmin || isInstructor || seats === 0}
            className="py-2 px-5 rounded-md bg-rose-500 group-hover:bg-rose-400 text-white"
            onClick={handleSelectClass}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllClassCard;
