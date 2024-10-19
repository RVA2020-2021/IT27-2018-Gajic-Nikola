import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupaComponent } from './components/grupa/grupa.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { SmerComponent } from './components/smer/smer.component';
import { StudentComponent } from './components/student/student.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';

const routes: Routes = [
  {path: 'grupa', component: GrupaComponent},
  {path: 'projekat', component: ProjekatComponent},
  {path: 'smer', component: SmerComponent},
  {path: 'student', component: StudentComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
