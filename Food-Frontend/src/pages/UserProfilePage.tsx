import { useUpdateMyUser } from 'src/api/MyUserApi'
import UserProfileForm from 'src/forms/user-profile-form/UserProfileForm'

const UserProfilePage = () => {
  const {updateUser, isLoading} = useUpdateMyUser()
  return (
    <UserProfileForm onSave={updateUser} isLoading={isLoading}/>
  )
}

export default UserProfilePage