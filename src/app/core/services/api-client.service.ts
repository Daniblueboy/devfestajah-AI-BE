import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatResponse, CodeHelperResponse } from '../../models/api-responses.model';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  chat(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, { message });
  }

  codeHelper(code: string, context?: string): Observable<CodeHelperResponse> {
    return this.http.post<CodeHelperResponse>(`${this.apiUrl}/code-helper`, { code, context });
  }
}
