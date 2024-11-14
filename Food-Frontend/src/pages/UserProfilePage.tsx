import { useGetCurrentUser, useUpdateUser } from "src/api/UserApi";
import UserProfileForm from "src/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();

  if (isGetLoading) {
    return (
      <div className="p-4">
        <div className="mb-4 h-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="mb-4 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="mb-4 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="mb-4 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="mb-4 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-10 w-24 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
