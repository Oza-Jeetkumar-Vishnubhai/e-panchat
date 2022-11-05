#include <bits/stdc++.h>
#define ll long long int
using namespace std;

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n;
        cin>>n;
        ll temp=1,flag=1,count=0;
        for(ll i=1;i<n;i++)
        {
            flag = temp|i;
            if(flag==temp)
                count++;
            temp=flag;
        }
        cout<<count<<endl;
    }
    return 0;
}