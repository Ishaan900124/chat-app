import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { IoClose } from "react-icons/io5";
import uploadFile from "../upload/uploadFile"

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
		profile_pic : ""
	});

	const [uploadPhoto,setUploadPhoto] = useState("");
	const handleUploadPhoto = async(e)=>{
		const file = e.target.files[0]
		const uploadPhoto = await uploadFile(file)
		setUploadPhoto(file)
		setInputs((d)=>{
		  return{
			...d,
			profile_pic : uploadPhoto?.url
		  }
		})
	}
	const handleClearUploadPhoto = (e)=>{
		e.stopPropagation()
		e.preventDefault()
		setUploadPhoto(null)
	}

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='Enter Name'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter Username'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<div className='flex flex-col gap-1'>
                        <label htmlFor='profile_pic'><div className="text-white">Photo :</div>

                        <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                        <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                        </p>
                        {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                         )
                        }
                        </div>
                        </label>
                        <input
                          type='file'
                          id='profile_pic'
                          name='profile_pic'
                          className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                          onChange={handleUploadPhoto}
                        />
                    </div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;