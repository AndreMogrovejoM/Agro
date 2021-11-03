import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoutes/PrivateRouteContainer.js";

/* ***Layouts*****/
const FullLayout = lazy(() => import("../layouts/full-layout/FullLayout.js"));
const BlankLayout = lazy(() =>
  import("../layouts/blank-layout/BlankLayout.js")
);
const ConventionLayout = lazy(() => import("../layouts/convention-layout"));
/* ***End Layouts*****/

const Error = lazy(() => import("../views/authentication/Error"));
// TimeRemain
const TimeRemain = lazy(() => import("../views/authentication/TimeRemain"));

const Login = lazy(() => import("../views/authentication/Login"));
const Register = lazy(() => import("../views/authentication/Register"));
const CheckDocuments = lazy(() =>
  import("../views/authentication/CheckDocuments")
);
const RegisterClients = lazy(() =>
  import("../views/authentication/RegisterClients")
);
const StandManagement = lazy(() =>
  import("../views/authentication/StandManagement")
);
const ManageCompanyAdmin = lazy(() =>
  import("../views/authentication/ManageCompanyAdmin")
);
const ManageAdminData = lazy(() =>
  import("../views/authentication/ManageAdminData")
);
const ResetPassword = lazy(() =>
  import("../views/authentication/ResetPassword")
);

// Report Charts

const Reports = lazy(() => import("../views/charts/Reports"));

/* ****Apps******/
const Chats = lazy(() => import("../views/apps/chats/Chats"));

/* ***Verge 3D ******/
const V3DApp = lazy(() => import("../views/V3DApp"));
const Auditorio = lazy(() => import("../views/Auditorio"));

/* ****Tables******/
// const BasicTable = lazy(() => import("../views/tables/BasicTable"));
// const PaginationTable = lazy(() => import("../views/tables/PaginationTable"));
const SignUpClients = lazy(() => import("../views/tables/SignUpClients"));
const SignUpCorporative = lazy(() =>
  import("../views/tables/SignUpCorporative")
);
const Guests = lazy(() => import("../views/tables/Guests"));

const CorporativesByRuc = lazy(() =>
  import("../views/tables/CorporativesByRuc")
);
const AdminExhibidor = lazy(() => import("../views/tables/AdminExhibidor"));
const AdminRRHH = lazy(() => import("../views/tables/AdminRRHH"));
const ConfigStand = lazy(() => import("../views/tables/ConfigStand"));

const ManageGuests = lazy(() => import("../views/tables/ManageGuests"));
const ClientsDocuments = lazy(() => import("../views/tables/ClientsDocuments"));
const CheckMyStatus = lazy(() => import("../views/tables/CheckMyStatus"));

const TableRucCorporative = lazy(() =>
  import("../views/tables/TableRucCorporative")
);

// userprofile
const UserProfile = lazy(() => import("../views/user-profile/UserProfile"));

// icons
const ReactIcons = lazy(() => import("../views/icons/ReactIcons"));

const Test = lazy(() => import("../test/test"));

/* ****Routes******/
const ThemeRoutes = () => {
  const dateNow = Date.now();
  const finalDate = Date.parse("24 Nov 2021 00:00:00 GMT-5");
  // if (dateNow >= finalDate) console.log(true);
  // else console.log(false, finalDate - dateNow);
  return (
    <Routes>
      <Route path="/auth" element={<BlankLayout />}>
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/:id" element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/" element={<BlankLayout />}>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/convention" element={<V3DApp />} /> */}
        <Route path="/react-icons" element={<ReactIcons />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route path="/develop-feria" element={<V3DApp />} />

      <Route path="/convention" element={<ConventionLayout />}>
        {
          <Route
            path="/convention"
            element={dateNow >= finalDate ? <V3DApp /> : <TimeRemain />}
          />
        }
        {/* <Route path="/convention" element={<V3DApp />} /> */}
      </Route>

      {/* --------------------------Private Routes---------------------------------  */}
      <Route
        path="/conferencia"
        element={
          <PrivateRoute authRoute="plenaryHall">
            {dateNow >= finalDate ? <Auditorio /> : <TimeRemain />}
          </PrivateRoute>
        }
      />

      <Route
        path="/user-profile"
        element={
          <PrivateRoute authRoute="adminUserProfile">
            <FullLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="/user-profile"
          element={
            <PrivateRoute authRoute="adminUserProfile">
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute authRoute="admin">
            <FullLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="/admin/chats"
          element={
            <PrivateRoute authRoute="adminUserProfile">
              <Chats />
            </PrivateRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/user-profile" />} />

        {/* REGISTER */}
        <Route
          path="/admin/register"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Exhibidores"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register2"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Colaboradores Jr"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register3"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Colaboradores"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register4"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Auspiciadores"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register5"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Patrocinadores"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register6"
          element={
            <PrivateRoute authRoute="adminRegister">
              <SignUpClients type={"Periodistas"} />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/register/newuser"
          element={
            <PrivateRoute authRoute="adminRegister">
              <RegisterClients />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register/edituser/:id"
          element={
            <PrivateRoute authRoute="adminRegister">
              <RegisterClients />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register/assignstand/:id"
          element={
            <PrivateRoute authRoute="adminRegister">
              <StandManagement />
            </PrivateRoute>
          }
        />
        {/* END REGISTER */}
        {/* REGISTER PARTICIPANTS */}
        <Route
          path="/admin/register-participants"
          element={
            <PrivateRoute authRoute="adminRegisterParticipants">
              <SignUpCorporative />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manageadmindata/"
          element={
            <PrivateRoute authRoute="adminRegisterParticipants">
              <ManageAdminData />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/managecompanyadmin"
          element={
            <PrivateRoute authRoute="adminRegisterParticipants">
              <ManageCompanyAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/managecompanyadmin/:id"
          element={
            <PrivateRoute authRoute="adminRegisterParticipants">
              <ManageCompanyAdmin />
            </PrivateRoute>
          }
        />
        {/* END REGISTER PARTICIPANTS */}
        {/* REGISTER GUESTS */}
        <Route
          path="/admin/register-guests"
          element={
            <PrivateRoute authRoute="adminRegisterGuests">
              <Guests />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/guestsreview/"
          element={
            <PrivateRoute authRoute="adminRegisterGuests">
              <ManageGuests />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/guestsreview/:id"
          element={
            <PrivateRoute authRoute="adminRegisterGuests">
              <ManageGuests />
            </PrivateRoute>
          }
        />
        {/* END REGISTER GUESTS */}
        {/* PARTICIPANT DOCUMENTS */}
        <Route
          path="/admin/participants-documents"
          element={
            <PrivateRoute authRoute="adminParticipantsDocuments">
              <ClientsDocuments />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/checkdocuments/:id"
          element={
            <PrivateRoute authRoute="adminParticipantsDocuments">
              <CheckDocuments />
            </PrivateRoute>
          }
        />
        {/* END PARTICIPANT DOCUMENTS */}
        {/* BILLING */}
        <Route
          path="/admin/billing"
          element={
            <PrivateRoute authRoute="adminBilling">
              {/* <PrivateRoute isAuth={true} authRoute="adminGuests"> */}
              <CorporativesByRuc />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tableruccorporative/:id"
          element={
            <PrivateRoute authRoute="adminBilling">
              <TableRucCorporative />
            </PrivateRoute>
          }
        />
        {/* END BILLING */}
        <Route
          path="/admin/checkmystatus"
          element={
            <PrivateRoute isAuth={true}>
              <CheckMyStatus />
            </PrivateRoute>
          }
        />
        {/* ADMIN EXHIBIDOR */}
        <Route
          path="/admin/exhibidor"
          element={
            <PrivateRoute authRoute="adminExibidor">
              <AdminExhibidor />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/configstand/:id"
          element={
            <PrivateRoute authRoute="adminExibidor">
              <ConfigStand />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <PrivateRoute authRoute="adminExibidor">
              <Reports />
            </PrivateRoute>
          }
        />

        {/* END ADMIN EXHIBIDOR */}
        {/* ADMIN RRHH */}
        <Route
          path="/admin/rrhh"
          element={
            <PrivateRoute authRoute="adminRecursosHumanos">
              {/* <PrivateRoute isAuth={true} authRoute="adminRRHH"> */}
              <AdminRRHH />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default ThemeRoutes;
