import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateWrapper } from './hoc/requiredPath';

import { DetailPage } from './pages/Detail';
import { ListPage } from './pages/List';
import { LoginPage } from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route element={<PrivateWrapper />}>
        <Route path='/products' element={<ListPage />} />
        <Route path='/products/:id' element={<DetailPage />} />
      </Route>
      <Route path='*' element={<h4>Not Found</h4>} />
    </Routes>
  );
}

export default App;
