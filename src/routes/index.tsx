import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ClassPage,
  EditPasswordPage,
  EditProfilePage,
  ErrorPage,
  HomePage,
  LoginPage,
  PasswordPage,
  RecoveryPage,
  RetrieveClassPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
  SchoolPage,
  StudentPage,
  TokenPage,
  UserPage,
} from '../pages'
import { ProtectedAuth } from '../shared'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<RecoveryPage />} />
      <Route path="/password/:userId/:token" element={<PasswordPage />} />
      <Route path="/token/:token" element={<TokenPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route element={<ProtectedAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />}>
          <Route path=":user_id" element={<RetrieveUserPage />} />
        </Route>
        <Route path="/school" element={<SchoolPage />}>
          <Route path=":school_id" element={<RetrieveSchoolPage />} />
        </Route>
        <Route path="/class" element={<ClassPage />}>
          <Route path=":class_id" element={<RetrieveClassPage />} />
        </Route>
        <Route path="/student" element={<StudentPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />}>
          <Route path=":view" element={<EditPasswordPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
