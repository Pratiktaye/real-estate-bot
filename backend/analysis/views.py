import pandas as pd
from django.http import JsonResponse
from rest_framework.decorators import api_view

df = pd.read_excel('Sample_data.xlsx')

@api_view(['POST'])
def analyze_area(request):
    query = request.data.get("query", "").lower()
    matched_areas = [area for area in df['Area'].unique() if area.lower() in query]
    filtered = df[df['Area'].isin(matched_areas)]
    summary = f"This is a mock analysis for: {', '.join(matched_areas)}."
    chart_data = (
        filtered.groupby(['Year'])['Price']
        .mean()
        .reset_index()
        .rename(columns={'Price': 'avg_price'})
        .to_dict(orient='records')
    )
    table_data = filtered.to_dict(orient='records')
    return JsonResponse({
        "summary": summary,
        "chart_data": chart_data,
        "table_data": table_data
    })
