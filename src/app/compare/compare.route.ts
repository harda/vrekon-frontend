import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
//import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VrekonService } from "../institute/vrekon.service";
import { Institute, IInstitute } from '../shared/model/institute.model';
import { InstituteSrvc, IInstituteSrvc } from '../shared/model/instituteSrvc.model';
import { InstituteComponent } from '../institute/institute.component';
import { UpdateInstituteComponent } from '../institute/update-institute.component'
import { ServiceCreateComponent } from '../institute/service-create.component';
import { CompareFormComponent } from './compare-form/compare-form.component';
import { CompareResultComponent } from './compare-result/compare-result.component';



// @Injectable({ providedIn: 'root' })
// export class InstituteResolve implements Resolve<IInstitute> {
//     constructor(private service: VrekonService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstitute> {
//          const id = route.params['id'] ? route.params['id'] : null;
//          const institute = new Institute();
//          institute.id=id;
//          if (id) {
//              return this.service.findInstitute(institute).pipe(
//                  filter((response: HttpResponse<IInstitute>) => response.ok),
//                  map((response: HttpResponse<IInstitute>) => response.body)
//              )
//          }
//          return of(institute);
//     }
// }
// @Injectable({ providedIn: 'root' })
// export class IdInstituteResolve implements Resolve<IInstitute> {
//     constructor(private service: VrekonService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstitute> {
//          const id = route.params['id'] ? route.params['id'] : null;
         
//          return id;
//     }
// }
// @Injectable({ providedIn: 'root' })
// export class ServiceResolve implements Resolve<IInstituteSrvc> {
//     constructor(private service: VrekonService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstituteSrvc> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         const instituteSrvc = new InstituteSrvc();
//         instituteSrvc.id=id;
//          if (id) {
//              return this.service.findDbService(instituteSrvc).pipe(
//                  filter((response: HttpResponse<IInstituteSrvc>) => response.ok),
//                  map((response: HttpResponse<IInstituteSrvc>) => response.body)
//              )
//          }
//          return of(instituteSrvc);
//     }
// }

// export class IdServiceResolve implements Resolve<IInstitute> {
//     constructor(private service: VrekonService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstituteSrvc> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         return id;
//     }
// }

export const compareRoute: Routes = [
    {
        path: '',
        component: CompareFormComponent,
        data: {
            //authorities: ['ROLE_USER'],
            //pageTitle: 'gwayApp.bpCompetencyJob.home.title'
        },
        //canActivate: [UserRouteAccessService]
    },
    {
        path: 'compare-result',
        component: CompareResultComponent,
    },

    // {
    //     path: ':id/update',
    //     component: UpdateInstituteComponent,
    //     resolve: {
    //         institute: InstituteResolve
    //     },
    // },
    // {
    //     path: ':id/create-service',
    //     component: ServiceCreateComponent,
    //     resolve: {
    //         institute: InstituteResolve
    //     },
    // },
    // {
    //     path: ':id/update-service',
    //     component: ServiceCreateComponent,
    //     resolve: {
    //         dbService: ServiceResolve
    //     },
    // },
];

export const comparePopupRoute: Routes = [
    // {
    //     path: ':id/delete',
    //     component: JobDeletePopupComponent,
    //     resolve: {
    //         job: JobResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'gwayApp.bpCompetencyJob.home.title'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // }
];
